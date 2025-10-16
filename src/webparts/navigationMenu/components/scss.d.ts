// This applies to ANY .scss file imported in the project
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
