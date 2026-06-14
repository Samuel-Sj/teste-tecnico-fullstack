import axios from 'axios';

export const baseURL = axios.create({'http://localhost:3000/api'});

export async function fetchClientes = () =>{
try{
	const {data} = await axios.get('api/names').then(response=>
{response.data.json})
	if (!data) {
return null}
	return data;
} catch (err) {
console.log('Erro ao retornar dados da API', '$err');

export  async function fetchClientByCPF = () =>{
try {
	const {data} = await axios.get('api/cpf/:cpf').then(response=>
{response.data.json};
	if (!data){
	return null;}
	return data;

} catch (err) {
	console.log('Erro ao retornar cpf do cliente', '$err');


export async function  fetchClienteByName = () = {
try {
	const {data} = axios.get('api/name/:name').then(response=>{
response.data.json};
	if(!data){
	return null;
}
	return data;
}
} catch (err) {
console.log('Erro ao retornar nome do cliente','$err'); 
