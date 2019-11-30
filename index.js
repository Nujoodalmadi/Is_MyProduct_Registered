$("button").click(function() {
  //Emptying previous search
  $("#products").empty();
  $.ajax({
    url:
      "https://data.gov.sa/Data/ar/dataset/7ef8bcb5-62d7-4dce-bdb3-95aa06032f8a/resource/04ddc748-7051-49e1-af16-168fdc8798f0/download/list-of-registered-oral-hygiene-products.json",
    success: function(data) {
      var search = $("input").val();
      //Filtering the array of products
      var filteredData = $.grep(data, function(product, i) {
        return searchFunction(product, search);
      });
      filteredData.forEach(product =>
        $("#products").append(`
        <div id="product" class="m-sm-auto col-sm-2 col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3 m-auto pt-5 pt-xl-0">
          <div class="fdb-box fdb-touch">
            <h4>${product.ProductEnName}</h4>
            <h4>${product.ProductArName}</h4>
            <h4>Brand: ${product.BrandName}</h4>
            <p>Listed Name: ${product.ProductArName}</p>
            <p>Counrty: ${product.CounrtyEn}</p>
            <p>Valume: ${product.PackageVolume}</p>
            <p>Manufacturer: ${product.manufactureenglishname}</p>
            <p># ${product.ProductNumber}</p> 
            <p class="mt-4"><a href="https://www.froala.com">Learn More <i class="fas fa-angle-right"></i></a></p>
          </div>
        </div>
   `)
      );
    },
    error: function(e) {
      console.log(e);
    }
  });
});

// Returning the filtering condition
searchFunction = function(product, search) {
  return (
    product.BrandName.toString()
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    product.ProductArName.toString().includes(search) ||
    product.ProductEnName.toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );
};
