import { fetchPlaceholders } from '../../scripts/lib-franklin.js';

// Banner is a slide show block, it randomly choose one slide to show
// I improved the code a little bit so it looks diff from original
export default async function decorate(block) { // what is passed in is an Element. See https://developer.mozilla.org/en-US/docs/Web/API/Element
  console.log('===x banner block', block)

  // placeholder example
  const placeholders = await fetchPlaceholders();

  const slides = [...block.children];
  const randomIndex = Math.floor(Math.random() * slides.length)
  slides.forEach((slide, i) => {
    slide.classList.add('banner-slide');
    slide.classList.add(i === randomIndex ? 'show' : 'hide')

    // add children class
    console.log('===x banner block slide children', slide.children)
    slide.children[0].classList.add('banner-image');
    slide.children[0].querySelector('img').loading = 'eager'; // See eager loading for <img> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes
    slide.children[1].classList.add('banner-text');
    Object.entries(placeholders).forEach(o => {
      slide.children[1].innerHTML = slide.children[1].innerHTML.replaceAll(o[0], o[1])
      console.log(slide.children[1].innerHTML)
    })
  });
}
