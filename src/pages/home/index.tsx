import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import styles from './home.module.css';


interface CoinsProps{
   name: string;
   delta_24h: string;
   price: string;
   symbol: string;
   volume_24h: string;
   market_cap: string;
   formatedPrice: string;
   formatedMarket: string;
   formatedDelta?: number;
}

interface DataProps{
    coins: CoinsProps[];
}

// 
export function Home(){

    const [coins, setCoins] = useState<CoinsProps[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    useEffect(()=> {
        async function getData(){
            fetch('https://sujeitoprogramador.com/api-cripto/?key=8330f27a4e1628e6&pref=BRL')
            .then(response => response.json())
            .then((data: DataProps)=> {
                const coinsData = data.coins.slice(0, 15);
                
                const price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

                const formatResult = coinsData.map((item)=> {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap)),
                        formatedDelta: parseFloat(item.delta_24h.replace(',','.'))
                    }

                    return formated;
                })
                
                setCoins(formatResult);

                
            })
        }


        getData();
    })

    function handleSearch(e: FormEvent){
        e.preventDefault()
        if(search === "") return;

        navigate(`/detail/${search}`);
    }

    return(
        <>
            <main className={styles.container}>
                <form className={styles.form} onSubmit={(e)=> handleSearch(e)}>
                    <input type="text"
                        placeholder='Digite a moeda'
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)} 
                    />
                    <button type='submit'>
                        <FaSearch size={30} color="#fff"/>
                    </button>
                </form>


                <table>
                    <thead>
                        <tr>
                            <th scope='col'>Moeda</th>
                            <th scope='col'>Valor mercado</th>
                            <th scope='col'>Preço</th>
                            <th scope='col'>Volume</th>
                        </tr>
                    </thead>
                    <tbody id='tbody'>
                        {coins.map(coin => (
                            <tr key={coin.name} className={styles.tr}>
                                <td className={styles.tdLabel} data-label='Moeda'>
                                    <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                                        <span>{coin.name}</span> | {coin.symbol}
                                    </Link>
                                </td>
                                <td className={styles.tdLabel} data-label='Mercado'>
                                    <span>{coin.formatedMarket}</span>
                                </td>
                                <td className={styles.tdLabel} data-label='Preço'>
                                    <span>{coin.formatedPrice}</span>
                                </td>
                                <td className={Number(coin?.formatedDelta && coin?.formatedDelta) >= 0 ? styles.tdProfit : styles.tdLoss} data-label='Volume'>
                                    <span>{coin.delta_24h}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}