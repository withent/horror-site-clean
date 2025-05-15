<template>
  <div class="terms-page">
    <h1>利用規約</h1>
    <p>
      本サイトは、怖い体験話やホラーコンテンツを楽しむためのエンタメサイトです。ご利用にあたっては、以下の順律にご同意いただける方のみ、ご利用ください。
    </p>

    <h2>利用者の責任</h2>
    <p>
      本サイトに掲載される内容は、利用者自身の決心と責任により、見聞きし利用するものとします。
    </p>

    <h2>充実した体験の為の注意</h2>
    <p>
      このサイトで掲載される内容は、一部の方にとっては心理的なストレスとなる場合があります。これは個人の感受度によるものであり、起こりうるいかなる事象も、過失も含め、運営者は一切責任を負いません。
    </p>

    <h2>個人情報について</h2>
    <p>
      ご返信項目において受付けた個人情報は、公開や課題の確認以外の目的で利用することはありません。
    </p>

    <h2>目的の理解</h2>
    <p>
      本サイトは、利用者に実際の体験を引き起こすことを目的としていません。
      楽しみ方は人それぞれであり、このサイトを利用したことで発生した事象については、運営者は一切責任を負いかねます。
    </p>
  </div>
  <div style="text-align: center; margin-top: 2rem">
  <NuxtLink to="/" class="back-link">⬅ トップに戻る</NuxtLink>
</div>
</template>

<script setup>
</script>

<style scoped>
.terms-page {
  font-family: 'Shippori Mincho B1', serif;
  color: white;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  z-index: 10;
  position: relative;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #baffc9;
}

h2 {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #e8ffe8;
}

p {
  margin-top: 1rem;
  color: #f5f5f5;
}
.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #baffc9;
  text-decoration: underline;
  font-size: 1rem;
}
</style>
