"use server";

import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { decode } from "base64-arraybuffer";
import { supabaseServer } from "../supabase/server";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongodb";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export async function setBotPower(toggle: boolean) {
  try {
    const { db } = await connectToDatabase();

    const toggleData = db.collection("switch").updateOne(
      { _id: "switch" },
      {
        $set: {
          chatbot_on: toggle,
        },
      }
    );
    revalidatePath("/app/settings");
    // console.log(toggleData);
    return { data: true, error: null };
  } catch (error) {
    return { error: JSON.stringify(error), data: null };
  }
}

export async function isKeyValid(key: string) {
  try {
    return key === process.env.ADMIN_SECRET_KEY;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function ping() {
  console.log("ping server... pong.");
  return { ping: "pong" };
}

export interface SaaS {
  created_at: string;
  slug: string;
  title: string;
  description: string;
  meta_description: string;
  public_url: string;
  image_url: string;
}

export async function getBlogBySlug(slug: string) {
  try {
    const supabase = supabaseServer();
    let { data, error } = await supabase
      .from("blogs") // Replace 'your-table-name' with the actual name of your table
      .select("*") // Select all columns, or specify like 'id, title, content'
      .eq("slug", slug) // Filter to match the 'slug' column with the given slug string
      .single(); // Ensures that only one row is returned

    if (error) return { error };
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function getSaaSBySlug(slug: string) {
  try {
    const supabase = supabaseServer();
    let { data, error } = await supabase
      .from("saas") // Replace 'your-table-name' with the actual name of your table
      .select("*") // Select all columns, or specify like 'id, title, content'
      .eq("slug", slug) // Filter to match the 'slug' column with the given slug string
      .single(); // Ensures that only one row is returned

    if (error) return { error };
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function getAllBlogs() {
  try {
    const supabase = supabaseServer();
    const { data: userData, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error("unable to get blogs");

    return { blogs: userData };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function generateSEOTitle(title: string) {
  if (!title) {
    return {
      error: "Title is required",
    };
  }

  const messages: any = [
    {
      role: "user",
      content: `You act like an award winning SEO content creator. Please generate one SEO friendly blog title using the given title: '${title}'. Do not use extra words like comprehensive. Do not make any guides or lists. Do not mention anything about making it SEO friendly.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;

  // console.log("done. Checking for content.");
  // console.log(content);

  if (!content) {
    // console.log("no content found. stopping.");
    return { error: "Unable to generate title." };
  }

  return { data: content };
}

export async function generateMainKeyword(title: string) {
  if (!title) {
    return {
      error: "Title is required",
    };
  }

  const messages: any = [
    {
      role: "user",
      content: `You act like an award winning SEO content creator. Please generate a main keyword for the following title: '${title}'.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;

  // console.log("done. Checking for content.");

  if (!content) {
    // console.log("no content found. stopping.");
    return { error: "Unable to generate keywords." };
  }

  return { keyword: content };
}

export async function generateSubKeywords(mainKeyword: string) {
  if (!mainKeyword) {
    return {
      error: "Main keyword is required",
    };
  }

  const messages: any = [
    {
      role: "user",
      content: `You act like an award winning SEO content creator. Please generate a list of sub keywords for the following main keyword: '${mainKeyword}'. Please list no more than 5 keywords and separate each with a comma. Do not respond with anything other than the relevant keywords.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;

  // console.log("done. Checking for content.");

  if (!content) {
    // console.log("no content found. stopping.");
    return { error: "Unable to generate sub keywords." };
  }

  return { keywords: content };
}

export async function generateMetaDescription(title: string, keyword: string) {
  if (!title) {
    return {
      error: "Title is required",
    };
  }

  if (!keyword) {
    return {
      error: "Main keyword is required",
    };
  }

  const messages: any = [
    {
      role: "user",
      content: `You act like an award winning SEO content creator. Please generate a meta description for the following title: '${title}'. The main keyword is: ${keyword}.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;

  // console.log("done. Checking for content.");

  if (!content) {
    // console.log("no content found. stopping.");
    return { error: "Unable to generate meta description." };
  }

  return { description: content };
}

export async function getAllKeywords() {
  try {
    const supabase = supabaseServer();
    let { data, error } = await supabase.from("blogs").select("main_keyword");

    if (error) {
      throw new Error(error.message as string);
    }
    if (!data) throw new Error("Unable to get keywords.");
    const keywordsArray = data?.map(
      (item: { main_keyword: any }) => item.main_keyword
    );
    const keywords = keywordsArray.join(", "); // Join with a comma and a space
    // console.log(keywords);
    return { keywords };
  } catch (error) {
    // console.log(error);
    return { error };
  }
}

export async function generateBlogOutline(
  title: string,
  keyword: string,
  keywords: string
) {
  // console.log(title, keyword, keywords);
  if (!title) {
    return {
      error: "Title is required",
    };
  }

  if (!keyword || !keywords) {
    return { error: "Keyword(s) is/are missing" };
  }

  const messages: any = [
    {
      role: "user",
      content: `I want you to act as a blogger. Can you please write a SEO friendly blog outline for the blog titled ${title}. The main keyword for the blog is ${keyword}. The sub keywords are also ${keywords}. Can you please create a list of headers to use for the article? Can you please give me a list, comma separated, that will give a list of the headings for the article only? Please do not reply anything other than the outline. Also do not add guides, comprehensive guides or long lists. Please add a header that can tie into marketing our business.
                Do not give a numbered list. Do not mention anything about marketing the business. Just give me a comma separated list only.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const outline = completion?.choices?.[0]?.message?.content;
  // console.log(outline);

  if (!outline) {
    return { error: "Unable to generate blog outline" };
  }

  return { outline };
}

export async function generateBlogSection(
  title: string,
  keyword: string,
  sectionTitle: string
) {
  if (!title) {
    return {
      error: "Title is required",
    };
  }

  // const supabase = supabaseServer();
  const messages: any = [
    {
      role: "user",
      content: `You act as a professional blogger. We are writing a blog and I need you to write 1 blog section. The article is titled ${title}. The main keyword is ${keyword}.
                The section I need you to write is called ${sectionTitle}. Please give me back the content in markdown only format.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;
  // console.log(content);
  // console.log("done. Checking for content.");

  if (!content) {
    // console.log("no content found. stopping.");
    return { error: "Unable to generate blog content" };
  }

  return { content };
}

export async function generateBlogContent(
  title: string,
  keyword: string,
  keywords: any,
  outline: string
) {
  if (!title) {
    return {
      error: "Title is required",
    };
  }

  if (!keyword || !keywords) {
    return { error: "Keyword(s) is/are missing" };
  }
  // const supabase = supabaseServer();
  const messages: any = [
    {
      role: "user",
      content: `I want you to act as a blogger and you want to write a blog post about ${keyword}, with a friendly and approachable tone that engages readers. Your target audience is business owners and people looking to get web development done.
      Write in a personal style using singular first-person pronouns only. I want you to include these keywords: ${keywords} throughout the article.
      Format your response using markdown. Use headings, subheadings, bullet points, and bold to organize the information.
      Do not create beginners guides or long form content. Please make the article at least 500 words long.
      Do not use extra words such as 'comprehensive' or 'guide', and do not exaggerate on details or try to create long guides or go too much into details.
      Please insert an appropriate call to action for readers to contact us in need of development help or saas creation and please create a markup link linking to the url '/#contact'.
      Also please write the blog in a way to market our web development services, named CheekySaaS, but make it subtle and helpful. Thank you.`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  const content = completion?.choices?.[0]?.message?.content;

  // console.log("done. Checking for content.");

  if (!content) {
    // console.log("no content found. stopping.");
    return { error: "Unable to generate blog content" };
  }

  return { content };
}

export async function generateAndUploadImage(title: string, slug: string) {
  // console.log(title, slug);
  try {
    if (!title) return { error: "No valid title" };

    const supabase = supabaseServer();

    // console.log("generating image...");

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: `You are an expert illustrator. Please create a featured image that is photorealistic and is related to the blog title: ${title}. Please do not add text to the image.`,
      n: 1,
      size: "1792x1024",
      response_format: "b64_json",
    });

    // console.log("image:", image);

    const imageName = `featured-${slug}.png`;
    const imageData = image?.data?.[0]?.b64_json as string;

    if (!imageData) {
      // console.log("no imageData.. error");
      throw new Error("Unable to generate blog image");
    }

    // console.log("done. saving image to bucket...");

    const { data, error } = await supabase.storage
      .from("blogs")
      .upload(imageName, decode(imageData), { contentType: "image/png" });

    // console.log("done. checking for errors.");

    if (error) {
      // console.log("error found. error:", error);
      return { error: "Unable to upload blog image to database" };
    }

    // console.log("no error found. generating image url...");

    const path = data?.path;
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogs/${path}`;

    // console.log("done. returning image url...", imageUrl);
    return { imageUrl };
  } catch (error) {
    return { error };
  }
}

export async function addBlogToDb(data: string) {
  try {
    if (!data) throw new Error("No data found");

    const supabase = supabaseServer();
    const parsedData = JSON.parse(data);

    const { error } = await supabase.from("blogs").insert(parsedData);

    if (error) throw new Error("unable to save blog to db");
    return { error: false };
  } catch (error) {
    return { error };
  }
}

export async function getAllSaaS() {
  try {
    const supabase = supabaseServer();
    const { data: userData, error } = await supabase
      .from("saas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error("unable to get saas");

    return { saas: userData };
  } catch (error) {
    return { error: "Unable to get saas" };
  }
}

export async function addSaaSToDb(data: string) {
  try {
    if (!data) throw new Error("No data found");

    const supabase = supabaseServer();
    const parsedData = JSON.parse(data);

    const { error } = await supabase.from("saas").insert(parsedData);

    if (error) throw new Error("unable to save saas to db");
    revalidatePath("/admin");
    return { error: false };
  } catch (error) {
    return { error };
  }
}
