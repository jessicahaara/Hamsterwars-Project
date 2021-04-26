const h1 = document.querySelector('h1')


h1.addEventListener('mouseover', () => {
        h1.innerHTML = 'Hej snällis'
})

h1.addEventListener('mouseout', () => {
        h1.innerHTML = 'Frontend'
})
