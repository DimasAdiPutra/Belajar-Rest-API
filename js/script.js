function cards(data) {
  return /*html*/ `
  <div class="col-md-4">
    <div class="card mb-3">
      <img src="img/${data.gambar}" class="card-img-top" alt="Meat Lover" />
      <div class="card-body">
        <h5 class="card-title">${data.nama}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Rp ${data.harga},-</h6>
        <p class="card-text">${data.deskripsi}</p>
        <a href="#" class="card-link text-decoration-none">Buy Now</a>
      </div>
    </div>
  </div>`;
}

function allMenus() {
  $.ajax({
    type: "get",
    url: "../data/makanan.json",
    dataType: "json",
    success: function (response) {
      let menus = response.menu;
      $.each(menus, function (i, data) {
        $("#menus").append(cards(data));
      });
    },
    error: function (xhr) {
      $("#title").html("Menu Tidak Ada");
      console.log(`error ${xhr.status} ${xhr.statusText}`);
    }
  });
}

$(document).ready(function () {
  allMenus();

  // navbar
  $(".nav-link").on("click", function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    let kategori = $(this).html();
    $("#title").html(kategori);

    $.ajax({
      type: "get",
      url: "../data/makanan.json",
      dataType: "json",
      success: function (response) {
        let menus = response.menu;
        let content = "";
        if (kategori === "All Menus") {
          $("#menus").html("");
          allMenus();
          return;
        }
        $.each(menus, function (i, data) {
          if (data.kategori === kategori.toLowerCase()) {
            content += cards(data);
          }
        });
        $("#menus").html(content);
      },
      error: function (xhr) {
        $("#title").html("Menu Tidak Ada");
        console.log(`error ${xhr.status} ${xhr.statusText}`);
      }
    });
  });
});
