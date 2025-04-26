import { listBlogs } from "@/api/blog";
import { Feed } from "feed";

export const dynamic = 'force-static'

const SITE_URL = "https://fireproof.website";

export async function GET() {
  const blogs = await listBlogs();

  const feed = new Feed({
    title: "A fireproof website",
    link: SITE_URL,
    description: "A fireproof website",
    feedLinks: {
      atom: `${SITE_URL}/rss.xml`,
    },
    id: SITE_URL,
    copyright: "All rights reserved 2023, Nickolaj Jepsen",
  });

  blogs.forEach((article) => {
    feed.addItem({
      title: article.title,
      link: `${SITE_URL}/blog/${article.date}/${article.slug}`,
      date: new Date(article.date),
      author: [
        {
          name: "Nickolaj Jepsen",
          email: "nickolaj@fireproof.website",
          link: SITE_URL,
        },
      ],
    });
  });

  feed.addContributor({
    name: "Nickolaj Jepsen",
    email: "nickolaj@fireproof.website",
    link: SITE_URL,
  });

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
