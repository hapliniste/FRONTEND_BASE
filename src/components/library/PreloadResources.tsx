import Head from 'next/head';

const PreloadResources: React.FC = () => {
  return (
    <Head>
      {/* Preload critical images */}
      <link
        rel="preload"
        href="/icon_website.png"
        as="image"
        type="image/png"
      />
      <link
        rel="preload"
        href="/icons/rocket.svg"
        as="image"
        type="image/svg+xml"
      />
      <link
        rel="preload"
        href="/icons/solutions.svg"
        as="image"
        type="image/svg+xml"
      />
    </Head>
  );
};

export default PreloadResources; 