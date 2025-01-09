import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import HandsomeError from '~/components/HandsomeError';
import TextRenderer from '~/components/TextRenderer';
import { getPage } from '~/services/post.server';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import { PAGE } from '~/constants/page.constant';
import { getServices } from '~/services/service.server';
import { IService } from '~/interfaces/service.interface';
import ServicePage from './ServicePage';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { pageSlug } = params;

  try {
    const page = await getPage(pageSlug!);
    let services = [] as IService[];
    if (page.pst_template.ptp_code === PAGE.TEMPLATE.SERVICE_PAGE.code) {
      services = await getServices();
    }

    return {
      page,
      services,
    };
  } catch (error) {
    // console.error(error);
    throw new Response('Not found', { status: 404 });
  }
};

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  switch (page.pst_template.ptp_code) {
    case PAGE.TEMPLATE.LANDING_PAGE.code:
      return <LandingPage />;

    case PAGE.TEMPLATE.CONTACT_PAGE.code:
      return <ContactPage />;

    case PAGE.TEMPLATE.SERVICE_PAGE.code:
      return <ServicePage />;

    default:
      return (
        <main>
          <TextRenderer content={page.pst_content} />
        </main>
      );
  }
}

export const ErrorBoundary = () => <HandsomeError />;
