const data = [
  { name: "A", price: 300 },
  { name: "B", price: 100 },
  { name: "C", price: 200 }
];

const box = document.getElementById("products");
const sort = document.getElementById("sort");

function show(list) {
  box.innerHTML = "";
  list.forEach(p => {
    box.innerHTML += `<div class="card">${p.name} - ₹${p.price}</div>`;
  });
}

sort.onchange = () => {
  let arr = [...data];
  if (sort.value === "low") arr.sort((a,b)=>a.price-b.price);
  if (sort.value === "high") arr.sort((a,b)=>b.price-a.price);
  show(arr);
};

show(data);
