import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useShopQuery,
  useShop,
} from '@shopify/hydrogen';

import {Layout} from '~/components/index.server';

export default function Home({request}) {
  const pathname = new URL(request.normalizedUrl).pathname;
  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });
  const shopInfo = useShop();
  console.log('🚀 ~ Home ~ shopInfo', shopInfo);

  return (
    <Layout pathname={pathname}>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Suspense>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}

function HomepageContent() {
  const {data} = useShopQuery({
    query: PRODUCT_HOME_PAGE_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  const {featuredProducts, featureArticles} = data;
  const product = featuredProducts.nodes[0];
  const productMedia = product.media.nodes;
  const productVariant = product.variants.nodes[0];

  const articles = featureArticles.nodes;

  return (
    <>
      <div>Hello</div>
    </>
  );
}

const format = (amount) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    currencyDisplay: 'code',
  })
    .format(amount)
    .replace('JPY', '')
    .trim();
};

function SeoForHomepage() {}

const HOMEPAGE_SEO_QUERY = gql`
  {
    orders(first: 10) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const PRODUCT_HOME_PAGE_QUERY = gql`
  query homepage {
    featuredProducts: products(first: 1) {
      nodes {
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            priceV2 {
              amount
            }
          }
        }
        media(first: 4) {
          nodes {
            previewImage {
              id
              url
              height
              altText
              width
            }
          }
        }
      }
    }
    featureArticles: articles(first: 10, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        content
        contentHtml
        image {
          url
          altText
        }
        blog {
          id
          handle
        }
      }
    }
  }
`;
