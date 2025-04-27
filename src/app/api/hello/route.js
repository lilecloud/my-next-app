import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET() {
  const responseText = '你好aaaaa'

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  // const myKv = getRequestContext().env.MY_KV_NAMESPACE
  // await myKv.put('suffix', ' from a KV store!')
  // const suffix = await myKv.get('suffix')
  // return new Response(responseText + suffix)

  return new Response(responseText)
}


export async function POST() {
  const responseText = '你好aaaaa'

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  const myKv = getRequestContext().env.MY_KV
  await myKv.put('suffix', ' from a KV store!')
  const suffix = await myKv.get('suffix')
  console.log(" put success")
  return new Response(JSON.stringify({ suffix }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
