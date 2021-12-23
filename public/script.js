'use strict';

fetch('data.json')
  .then(res => res.json())
  .then((res) => {
    const rowsTemplate = res.data.map((el, index) => {
      return `
        <tr>
          <td>${index}</td>
          <td>${el.shop}</td>
          <td><a href="${el.url}" target="_blank">${el.name}</a></td>
          <td>${el.price.toLocaleString('pl-PL', {minimumFractionDigits: 2})}</td>
        </tr>
      `;
    });

    document.getElementById('app').innerHTML = `
      ${new Date(res.createdAt)}
      <table>
        <tr>
          <th>index</th>
          <th>shop</th>
          <th>name</th>
          <th>price</th>
        </tr>
        ${rowsTemplate.join('')}
      </table>
    `;
  });
