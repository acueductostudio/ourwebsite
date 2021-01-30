import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import ssrLocale from "utils/ssrLocale";
import clientLocale from "utils/clientLocale";
import Head from "components/layout/Head";
import ArticleSection from "components/articles/ArticleSection";
import PageClipper from "components/layout/PageClipper";
import ResourceFooter from "components/shared/footers/ResourceFooter";

export default function Contact({ locale, setTitle, pt }) {
  const [t, setT] = useState(pt);

  useEffect(() => {
    clientLocale({
      locale: locale,
      fileName: "articulos/productos-escalables-desde-el-inicio.json",
      callBack: (nT) => {
        setT(nT);
        setTitle(nT.head.headerTitle);
      },
    });
  }, [locale]);

  return (
    <PageClipper>
      <Head
        {...t.head}
        es_canonical={
          "https://acueducto.studio/articulos/productos-escalables-desde-un-inicio"
        }
        //image={{ fileName: "productos-escalables-desde-el-inicio.png", alt: t.head.image_alt }}
      ></Head>
      <Image width="1500px" height="600px" src="/assets/img/articles/1/cover.svg"/>
      <ArticleSection {...t.article} />
      <ResourceFooter />
    </PageClipper>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const pt = ssrLocale({
    locale: context.locale,
    fileName: "articulos/productos-escalables-desde-el-inicio.json",
  });
  return {
    props: {
      pt,
    },
  };
};
