import { localize, compose, enhance, EnhancerBuilder, RootComponentInstance } from '@uniformdev/canvas';
import {
  CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
} from '@uniformdev/canvas-contentful';
import { contentfulModelConverter } from '@/utils/enhancers/converters/contentfulModelConverter';
import { contentfulConfigured } from '@/utils/contentful';
import { contentfulEnhancer } from './enhancers/contentful/contentfulEnhancer';
import { contentfulMultiEnhancer } from './enhancers/contentful/contentfulMultiEnhancer';
import { contentfulQueryEnhancer } from './enhancers/contentful/contentfulQueryEnhancer';
import { CLOUDINARY_PARAMETER_TYPES, createCloudinaryEnhancer } from '@uniformdev/canvas-cloudinary';
import { cloudinaryModelConverter } from './converters/cloudinaryModelConverter';
import articleListEnhancer from './enhancers/articleList/articleListEnhancer';
import articleListNavigationEnhancer from './enhancers/articleList/articleListNavigationEnhancer';
import { ALGOLIA_PARAMETER_TYPES } from '@uniformdev/canvas-algolia';
import { algoliaConfigured, algoliaEnhancer } from './enhancers/algolia/algoliaEnhancer';
import algoliaConverter from './enhancers/algolia/algoliaConverter';
import algoliaRecommendCurrentProductOverwrite from './enhancers/algolia/algoliaRecommendCurrentProductOverwrite';

const nullEnhancer = () => {
  console.log('WARN: null enhancer called');
};

const getEnhancers = (context: {preview: boolean; language: string;  product?: string }): EnhancerBuilder => {
  const { language, preview, product } = context;
  console.log('PASSED LANGUAGE', { language });
  // console.log('PREVIEW', { preview });
  // console.log('PRODUCT', { product });

  let enhancingLocale = language;
  if (!enhancingLocale) {
    enhancingLocale = process.env.CONTENTFUL_LOCALE || 'en';
    console.log('USING LOCALE ' + enhancingLocale);
  }

  return new EnhancerBuilder()
    .component('articlesList', articleList =>
      articleList.parameterName(
        'articles',
        compose(contentfulQueryEnhancer(enhancingLocale), contentfulModelConverter, async (data: any) =>
          articleListEnhancer(data, preview)
        )
      )
    )
    .component('articlesListNavigation', articleList =>
      articleList.parameterName(
        'articles',
        compose(contentfulQueryEnhancer(enhancingLocale), contentfulModelConverter, async (data: any) =>
          articleListNavigationEnhancer(data, preview)
        )
      )
    )
    .parameterType(
      CANVAS_CONTENTFUL_PARAMETER_TYPES,
      contentfulConfigured ? compose(contentfulEnhancer(enhancingLocale), contentfulModelConverter) : nullEnhancer
    )
    .parameterType(
      CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
      contentfulConfigured ? compose(contentfulMultiEnhancer(enhancingLocale), contentfulModelConverter) : nullEnhancer
    )
    .parameterType(
      CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
      contentfulConfigured ? compose(contentfulQueryEnhancer(enhancingLocale), contentfulModelConverter) : nullEnhancer
    )
    .parameterType(CLOUDINARY_PARAMETER_TYPES, compose(createCloudinaryEnhancer(), cloudinaryModelConverter))
    .parameterType(
      ALGOLIA_PARAMETER_TYPES,
      algoliaConfigured
        ? compose(
            ({ parameter }) => algoliaRecommendCurrentProductOverwrite({ parameter, productId: product! }),
            algoliaEnhancer(),
            algoliaConverter
          )
        : nullEnhancer
    );
};

export default async function runEnhancers(
  composition: RootComponentInstance,
  context: { preview: boolean; language: string; country: string; product?: string }
) {
  const enhancers = getEnhancers(context);
  await enhance({
    composition,
    enhancers,
    context,
  });

  localize({
    composition,
    locale: context.language,
  });
}
