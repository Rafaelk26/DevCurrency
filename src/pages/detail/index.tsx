import styles  from './detail.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Detail(){

    interface CoinProp{
        symbol: string;
        price: string;
        name: string;
        market_cap: string;
        low_24h: string;
        high_24h: string;
        total_volume_24h: string;
        delta_24h: string;
        formatedPrice: string;
        formatedMarket: string;
        formatedLowPrice: string;
        formatedHighPrice: string;
        formatedDelta: number;
        error?: string;
    }

    const { id } = useParams();
    const [ detail, setDetail ] = useState<CoinProp>();
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        function getData(){
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=8330f27a4e1628e6&pref=BR&symbol=${id}`)
            .then(response => response.json())
            .then((data: CoinProp)=> {

                if(data.error){
                    alert('afasdasdas')
                    navigate("/")
                }

                const price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
                const resultData = {
                    ...data,
                    formatedPrice: price.format(Number(data.price)), 
                    formatedMarket: price.format(Number(data.market_cap)),              
                    formatedLowPrice: price.format(Number(data.low_24h)),  
                    formatedHighPrice:  price.format(Number(data.high_24h)),
                    formatedDelta: parseFloat(data.delta_24h.replace(',','.'))
                }
                
                setDetail(resultData)
                setLoading(false);
            })

        }

        getData()
    }, [id])

    if(loading){
        return(
            <div className={styles.cointaner}>
                <h4 className={styles.center} id={styles.black}>Carregando informações...</h4>
            </div>
        )
    }

    return(
        <>
            <div className={styles.container}>
                <h1 className={styles.center}>{detail?.name}</h1>
                <h2 className={styles.center}>{detail?.formatedPrice}</h2>
                <p className={styles.center}>{detail?.symbol}</p>
                <section className={styles.content}>
                    <p>
                        <strong>Preço: </strong>{detail?.formatedPrice}
                    </p>
                    <p>
                        <strong>Maior Preço: </strong>{detail?.formatedHighPrice}
                    </p>
                    <p>
                        <strong>Menor Preço: </strong>{detail?.formatedLowPrice}
                    </p>
                    <p>
                        <strong>Preço 24h: </strong>
                        <span className={Number(detail?.formatedDelta && detail?.formatedDelta) >= 0 ? styles.Profit : styles.Loss}>{detail?.delta_24h}</span>
                    </p>
                    <p>
                        <strong>Valor Mercado: </strong>{detail?.formatedMarket}
                    </p>
                </section>
            </div>
           
        
        </>
    )
}