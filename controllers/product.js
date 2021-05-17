
const debug=console.log.bind(console);

let getListProduct=(req,res)=>{
    const products=[{name:'Dell XPS 13 6365',price:17000000},{name:'IPhone 13',price:25000000}];
    return res.status(200).json(products);
}

export {getListProduct};