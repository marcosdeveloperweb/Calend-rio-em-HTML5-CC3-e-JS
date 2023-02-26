const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// obtendo a nova data, ano e mês atual
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// armazenando todos os meses em um array
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // recebendo primeiro dia do mês
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // recebendo última data do mês
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // recebendo último dia do mês
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // obtendo a última data do mês anterior
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // criando <li> do mês anterior, últimos dias.
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // criando <li> de todos os dias atuais
        // adicionando classe ativa a li se o dia, mês e ano atuais corresponderem
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // criando as <li> do próximo mês
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // obtendo os ícones anterior e posterior
    icon.addEventListener("click", () => { // adicionando evento de click
        // se o ícone clicado for o ícone anterior, diminua o mês atual em 1 caso contrário, aumente-o em 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // se o mês atual for menor que 0 ou maior que 11
            // criando uma nova data do ano e mês atual e passando-a como valor de data
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // atualizando o ano atual com o novo ano da data
            currMonth = date.getMonth(); // atualizando o mês atual com a nova data mês
        } else {
            date = new Date(); // passar a data atual como valor de data
        }
        renderCalendar(); //chamando a função renderCalendar
    });
});