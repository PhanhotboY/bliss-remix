import { json, LoaderFunctionArgs } from '@remix-run/node';
import * as cheerio from 'cheerio';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const fetchUrl = url.searchParams.get('url');
  const link = fetchUrl?.includes('https://')
    ? fetchUrl
    : `https://${fetchUrl}`;

  try {
    const res = await fetch(link || '');
    const html = await res.text();
    const $ = cheerio.load(html);

    // Look for the <link rel="icon"> or <link rel="shortcut icon">
    let logoUrl =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      $('meta[property="og:image"]').attr('content');
    // Extract the <title>
    const title = $('title').text();
    // Extract the meta description
    const description = $('meta[name="description"]').attr('content');

    return json({
      success: 1,
      link: link || '/',
      meta: {
        title: title || 'No title found',
        description: description || 'No description found',
        image: {
          url: logoUrl || '/assets/loading.gif',
        },
      },
    });
  } catch (e: any) {
    return json({
      success: 0,
      link: link || '/',
    });
  }
};
