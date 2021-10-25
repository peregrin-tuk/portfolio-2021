import linkResolver from "./link-resolver";
import prismicDOM from "prismic-dom";

const Elements = prismicDOM.RichText.Elements;

export default function (type, element, content, children) {

  // LINK
  // Generate links to Prismic Documents as <router-link> components
  // Present by default, it is recommended to keep this
  if (type === Elements.hyperlink) {
    let result = "";
    const url = prismicDOM.Link.url(element.data, linkResolver);

    if (element.data.link_type === "Document") {
      result = `<a href="${url}" data-nuxt-link>${content}</a>`;
    } else {
      const target = element.data.target
        ? `target="'${element.data.target}'" rel="noopener"`
        : "";
      result = `<a href="${url}" ${target}>${content}</a>`;
    }
    return result;
  }

  // IMAGE
  // If the image is also a link to a Prismic Document, it will return a <router-link> component
  // Present by default, it is recommended to keep this
  if (type === Elements.image) {
    let result = `<img src="${element.url}" alt="${
      element.alt || ""
    }" copyright="${element.copyright || ""}">`;

    if (element.linkTo) {
      const url = prismicDOM.Link.url(element.linkTo, linkResolver);

      if (element.data.link_type === "Document") {
        result = `<a href="${url}" data-nuxt-link>${result}</a>`;
      } else {
        const target = element.data.target
          ? `target="'${element.data.target}'" rel="noopener"`
          : "";
        result = `<a href="${url}" ${target}>${result}</a>`;
      }
    }
    const wrapperClassList = [element.label || "", "block-img"];
    result = `<p class="${wrapperClassList.join(" ")}">${result}</p>`;
    return result;
  }

  // EMBED
  if (type === Elements.embed) {
    return (`
      <div data-oembed="${element.oembed.embed_url}"
        data-oembed-type="${element.oembed.type}"
        data-oembed-provider="${element.oembed.provider_name}"
      >
        ${element.oembed.html}
      </div>
    `);
  }

  // PARAGRAPHS, HEADINGS, LISTS
  if (type === Elements.paragraph) {
    return '<p class="font-serif text-base lg:text-sm text-justify tracking-wide leading-6">' + children.join("") + "</p>";
  }

  if (type === Elements.heading2) {
    var id = element.text.replace(/\W+/g, "-").toLowerCase();
    return '<h2 class="text-h5 text-background text-center capitalize mt-8 mb-3" id="' + id + '">' + children.join("") + "</h2>";
  }

  if (type === Elements.list) {
    return `<ul class="py-4 ml-4">${children.join('')}</ul>`;
  }

  if (type === Elements.oList) {
    return `<ol class="py-4 ml-4">${children.join('')}</ol>`;
  }

  if (type === Elements.listItem) {
    return '<li class="list-inside font-serif text-base lg:text-sm tracking-wide leading-6">' + children.join("") + "</li>";
  }


  // Return null to stick with the default behavior for everything else
  return null;
}