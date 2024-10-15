# Atelier Maïs

### Contributors

<a href="https://github.com/stephaaniechen">Stephanie Chen</a>,
<a href="https://github.com/joshgarza">Josh Garza</a>,
<a href="https://github.com/hieungo89">Hieu Ngo</a>,
<a href="https://github.com/scottmatsuda">Scott Matsuda</a>

### Built with:

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction">![-javascript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)</a>
<a href="https://reactjs.org/">![-react](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)</a>
<a href="https://reactjs.org/">![-babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)</a>
<a href="https://reactjs.org/">![-webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)</a>
<a href="https://www.chartjs.org/">![-chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)</a>
<a href="https://expressjs.com/">![-express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)</a>
<a href="https://testing-library.com/docs/react-testing-library/intro/">![-testing library](https://img.shields.io/badge/Testing%20Library-E33332.svg?style=for-the-badge&logo=Testing-Library&logoColor=white)</a>

<!-- ABOUT THE PROJECT -->

## About the Project

Our team built a fully functional front-end for a product page of an eCommerce site that meets the specifications and requirements outlined by project stakeholders and utilized an API provided by the client.

### This project includes the following sections:

1. Overview
2. Related Products
3. Questions and Answers
4. Ratings and Reviews

<p align="right">(<a href="#top">back to top</a>)</p>

## App Features

### Product Overview:

<div align="center">
  <img width="500" alt="Product Overview" src="https://github.com/user-attachments/assets/7556bee9-8127-41ce-a941-e640cef9e465">
</div>
The overview section features an image gallery accompanied by a sidebar containing product information, style selectors, and add-to-cart functionality. When a different style is chosen, the image gallery updates accordingly. Similarly, selecting a new product triggers the sidebar to update. Users can specify the style, size, and quantity of the product before adding it to their cart. For discounted items, the original price is shown with a strikethrough, alongside the new discounted price.
<table>
  <tr>
    <td>
      <img alt="expanded view" src="https://github.com/user-attachments/assets/8cf22468-4964-4714-835d-8d17c9338b84">
    </td>
    <td width="80%">
      <b>Expanded View:</b>  Clicking an image within the gallery opens an expanded view modal. This modal features a zoom and pan capability, allowing users to zoom into the image and navigate with their cursor.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Related Products:

<div align="center">
  <img width="500" alt="Related Products" src="https://github.com/user-attachments/assets/ae5b0222-b3d1-44e0-960d-ed306cd813a9">
</div>
Users can browse the related products carousel to discover suggested items. Each card within the carousel displays the product's name, image, price, and rating. Users have the option to add the current product to their outfit list, which remains intact even after refreshing the browser. Selecting a related product will reload the page to display the chosen item.
<table>
  <tr>
    <td>
    <img alt="Compare Products" src="https://user-images.githubusercontent.com/12160369/198854423-97534e61-0777-4ccd-9a97-c91cd5160189.png">
    </td>
    <td width="80%">
      <b>Compare Products:</b>  Users can click on a related product card to compare its features with the current product. A modal popup appears, allowing for a side-by-side comparison without leaving the page. The modal highlights both the current and chosen products, showcasing attributes such as size, width, quality, comfort, fit, and length.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Questions and Answers:

<div align="center">
  <img width="500" alt="QnA" src="https://github.com/user-attachments/assets/58c41010-a01a-46a8-9766-6e03d484a234">
</div>
This section showcases questions and answers related to the product. By default, only two sets are displayed, but users can click to expand and view more. Users have the ability to post their own questions and answers, mark specific entries as helpful, and report inappropriate content. Marking as helpful elevates the entry to the top of the list, making it easier for others to find valuable information. Additionally, a search bar is provided for users to find specific questions or answers quickly.
<table>
  <tr>
    <td>
      <img alt="search" src="https://github.com/user-attachments/assets/12b3b9b5-659a-4989-82f3-cd3c2b903b3c">
    </td>
    <td>
      <b>Search Bar:</b> This feature enables users to search for questions and answers using at least three keywords. The search functionality is case-insensitive.
    </td>
  </tr>
  <tr>
    <td>
      <img alt="Add Question" src="https://github.com/user-attachments/assets/590910f5-e966-432e-9986-b4cad40e8685">
    </td>
    <td>
      <b>Add Questions:</b> Clicking the "ASK A QUESTION +" button opens a modal where users can submit their questions. They must complete the question box, provide their name, and enter a valid email address to enable the submit button.
    </td>
  </tr>
  <tr>
    <td>
      <img alt="Add Answer" src="https://github.com/user-attachments/assets/48b69de3-131b-4a9e-b346-0cbbfaddbf59">
    </td>
    <td width="80%">
      <b>Add Answer:</b> Clicking the "ADD ANSWER" button opens a modal for users to provide their answer to the given question. They must complete the answer box, enter their name, and provide a valid email address to enable the submit button. Additionally, users can upload up to five photos, which will be rendered as URLs using an external service called Cloudinary.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

### Ratings and Reviews:

<div align="center">
  <img width="500" alt="Reviews" src="https://github.com/user-attachments/assets/9e214ebe-8c1e-47e4-b1e6-68ccf6052641">
</div>
Users can view customer ratings for a product on a scale of 1-5. A composite average score and a detailed rating breakdown are provided. By default, up to two reviews are displayed, with an option to view more. Users can also submit their own reviews and ratings for the product. Similar to the questions and answers section, reviews can be marked as helpful to boost their visibility.
<table>
  <tr>
    <td>
      <img alt="Add Review" src="https://github.com/user-attachments/assets/652d08b1-26b2-4248-b225-ff0885af77d4">
    </td>
    <td width="80%">
      <b>Write Reviews:</b>  A modal popup enables users to add a review for the selected product without navigating away from the page.
    </td>
  </tr>
</table>
<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started:

1. Install Dependencies: `npm install`

2. Make a copy of `example.env` and rename to `.env`

3. Create a .gitignore file and place in:
   -node_modules
   -client/dist
   -.env

4. `npm run server-dev`

5. `npm run client-dev`:
   -listens on PORT set in `.env` or 3000

6. Launch site: http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>
