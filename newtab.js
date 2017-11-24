$(function() {
  var images, image, quote;

  $
    .ajax('https://www.reddit.com/r/earthporn/top.json')
    .done((data, status, jqXHR) => {
      images = data.data.children.map(child => {
        return {
          author: child.data.author,
          title: child.data.title,
          url: child.data.url,
          permalink: child.data.permalink,
        }
      });

      image = images[0];
      $('body').css('background-image',`url("${image.url}")`);
      $('.loading').fadeOut();

      console.info(image);

      $('.image-container>.title').text(image.title).attr('href', `https://reddit.com${image.permalink}`).attr('target', `_BLANK`);
      $('.image-container>.author').text(`/u/${image.author}`);
      $('.image-container').fadeIn();
    })
  $
    .ajax('http://quotes.rest/qod.json')
    .done((data, status, jqXHR) => {
      quote = data.contents.quotes[0]

      $('.quote-container>.quote').text(quote.quote);
      $('.quote-container>.author').text(quote.author);
      $('.quote-container').fadeIn();
    });

});