import {Suspense} from 'react';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({children, pathname}) {
  return (
    <>
      <Suspense fallback={null}></Suspense>
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
    </>
  );
}
