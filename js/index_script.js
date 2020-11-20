const ro = new ResizeObserver(entries => {
    for(let entry of entries){
        const width = entry.contentBoxSize
        ? entry.contentBoxSize.inlineSize
        : entry.contentRect.width



        if(entry.target.tagName === 'div' && width < '100%'){
            entry.target.textContent = `I won't change anymore`
            ro.unobserve(entry.target)
        }
    }
})


ro.observe(document.querySelector('div'))
