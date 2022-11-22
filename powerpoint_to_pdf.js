//convert pptx to pdf file javascript?
const cloud = require("asposeslidescloud")
const fs = require("fs")

const slidesApi = new cloud.SlidesApi("client_id", "client_secret")

const fileStream = fs.createReadStream("example.pptx")

// Convert the presentation to a PDF document.
slidesApi.convert(fileStream, "pdf").then((response) => {

    // Save the PDF document to a file.
    fs.writeFile("output.pdf", response.body, (error) => {
        if (error) throw error
    })
})


