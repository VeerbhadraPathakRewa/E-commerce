const insertData = (table_name, data) => {
    localStorage.setItem(table_name,JSON.stringify(data))|| [];
}
const getAllData = (table_name) => {

    if (localStorage.getItem(table_name) !== null) {
        let data = JSON.parse(localStorage.getItem(table_name));
        return data;
    }
    else {
        return [];
    }
}
const insertMsg = () => {
    swal("Success", "Your Data Inserted!", "success");
}
const deleteAndUpdateFunc = (table_name, data, link, massage, filterData) => {
    swal({
        title: "Once Change, you will not be able to recover",
        text: "warning",
        buttons: true,
        dangerMode: true,

    })
        .then((willDelete) => {
            if (willDelete) {
                insertData(table_name, data);
                if (link == "dynamic/cat_designe.html") {
                    readcategorydata();
                }
                else if (link == "dynamic/brand_designe.html") {
                    readBrandFunc(filterData);
                }
                else if (link == "dynamic/product_designe.html") {
                    readProductFunc(filterData);
                    return true;
                }
                swal("Success! Your  Imaginary file has been " + massage + "!",
                    {
                        icon: "success",
                    });
            } else {
                swal("Your imaginary file is safe!");
            }
        })
}