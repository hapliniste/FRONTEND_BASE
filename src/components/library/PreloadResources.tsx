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
      
      {/* Add font preloads if using Google Fonts */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap"
        as="style"
      />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        as="style"
      />
    </Head>
  );
};

export default PreloadResources; 