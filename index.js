$.ajax({
  url:
    "https://data.gov.sa/Data/ar/dataset/7ef8bcb5-62d7-4dce-bdb3-95aa06032f8a/resource/04ddc748-7051-49e1-af16-168fdc8798f0/download/list-of-registered-oral-hygiene-products.json",
  success: function(data) {
    var filteredData = $.grep(data, function(product, i) {
      return (
        product.BrandName === "ORAL B" ||
        product.ProductEnName === "Kin Care Mouthwash 250 ml"
      );
    });

    console.log(filteredData);
  },
  error: function(e) {
    console.log(e);
  }
});
