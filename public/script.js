fetch('/api/cards/getList')
  .then(res => res.json())
  .then((res) => {
    const rowsTemplate = res.map((el, index) => {
      const date = new Date(el.createdAt);

      return `
        <tr>
          <td>${index}</td>
          <td>${date.toLocaleString('pl-PL')}</td>
          <td>${el.shop}</td>
          <td><a href="${el.url}" target="_blank">${el.name}</a></td>
          <td>${el.price.toLocaleString('pl-PL', {minimumFractionDigits: 2})}</td>
        </tr>
      `;
    });

    document.getElementById('app').innerHTML = `
      <table>
        <tr>
          <th>index</th>
          <th>date</th>
          <th>shop</th>
          <th>name</th>
          <th>price</th>
        </tr>
        ${rowsTemplate.join('')}
      </table>
    `;
  });
