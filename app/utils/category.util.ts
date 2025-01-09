import { ICategory } from '~/interfaces/category.interface';

const getLayer1Categories = (categories: ICategory[]): ICategory[] => {
  return categories
    .filter((category) => !category.cat_parent)
    .sort((a, b) => a.cat_order - b.cat_order);
};

const getLayer2Categories = (
  categories: ICategory[],
  parent?: ICategory
): ICategory[] => {
  return categories
    .filter(
      (category) =>
        category.cat_parent &&
        !category.cat_parent.cat_parent &&
        (parent ? category.cat_parent._id === parent?.id : true)
    )
    .sort((a, b) => a.cat_order - b.cat_order);
};

const getLayer3Categories = (
  categories: ICategory[],
  parent?: ICategory
): ICategory[] => {
  return categories
    .filter(
      (category) =>
        category.cat_parent &&
        category?.cat_parent?.cat_parent &&
        (parent ? category.cat_parent._id === parent?.id : true)
    )
    .sort((a, b) => a.cat_order - b.cat_order);
};

export { getLayer1Categories, getLayer2Categories, getLayer3Categories };
