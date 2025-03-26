import HandsomeError from '~/components/HandsomeError';
import MainSlider from './MainSlider';
import { getSliders } from '~/services/slider.server';

import './_index.css';
import FeaturedServices from '~/routes/_main+/_index+/FeatureServices';
import AboutUs from '~/routes/_main+/_index+/AboutUs';
import News from './News';
import { getPosts } from '~/services/page.server';
import WhyUs from '~/routes/_main+/_index+/WhyUs';
import Results from '~/routes/_main+/_index+/Results';
import Customers from './Customers';
import Testimony from './Testimony';
import CTA from './CTA';
import { getBranches } from '~/services/branch.server';

export const loader = async () => {
  const [sliders, posts] = await Promise.all([
    getSliders(),
    getPosts(),
    getBranches(),
  ]);

  return { sliders, posts };
};

export default function Index() {
  return (
    <main className='grid grid-cols-12 gap-y-8 md:gap-y-12 lg:gap-y-16'>
      <MainSlider />

      <FeaturedServices />

      <AboutUs />

      <News />

      <WhyUs />

      <Results />

      <Customers />

      <Testimony />

      <CTA />
    </main>
  );
}

export const ErrorBoundary = () => <HandsomeError />;
