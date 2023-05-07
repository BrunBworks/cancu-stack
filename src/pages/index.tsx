import Countries from '@/components/commercelayer/Countries';
import { cms } from '@/utils/cms';

const IndexPage = ({ countries }: any) => {
  return (
    <div className="container max-w-screen-lg px-5 pb-10 mx-auto md:px-0">
      <Countries items={countries} searchBy={undefined} />
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const countries = await cms().allCountries('en');
  context.countries = countries;
  return {
    props: {
      countries,
    },
  };
};

export default IndexPage;
