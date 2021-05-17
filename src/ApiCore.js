import axios from 'axios';

export const getCategoria = () => {
return(
    axios.get('https://ds2project.herokuapp.com/categoria')
        .then(res => {
            return res;
            //console.log(res);
            //console.log('Holiiiii' + res.data.map(({id_tipo_id})=>(id_tipo_id)));
        })
        .catch(err=>{
            console.log(err);
        })
)
}

export const getUsuarios = () => {
    return(
        axios.get('https://ds2project.herokuapp.com/usuario')
        .then(res => {
            return res;
            //console.log(res);
            //console.log('Holiiiii' + res.data.map(({id_tipo_id})=>(id_tipo_id)));
        })
        .catch(err=>{
            console.log(err);
        })
    )
}
    
