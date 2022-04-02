import Head from 'next/head'

const Meta = (props) => {
    return ( 
        <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.desc} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.desc} />
        <meta property="og:url" content={props.web_url} />
        <meta property="og:type" content="website" />
        <link rel="icon" href={props.href} />
      </Head>
     );
}
 
export default Meta;