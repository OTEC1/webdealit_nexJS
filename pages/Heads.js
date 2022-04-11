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
        <meta property='og:site_name' content={props.web_url}/>
        <meta name='twitter:card' content='summary'/>
        <meta name="twitter:title" content={props.title}/>
        <meta name="twitter:description" content={props.desc}/>
        <meta name='twitter:site' content={props.web_url}/>
        <meta name='twitter:creator' content={props.web_url}/>
        <meta httpEquiv='cache-control' content='no-cache'/>
        <link rel="icon" href={props.href} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8581831304889952"
              crossOrigin="anonymous"></script>
      </Head>
     );
}
 
export default Meta;