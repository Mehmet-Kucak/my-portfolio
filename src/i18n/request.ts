import { getRequestConfig as rawGetRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const SUPPORTED_LOCALES = ["en", "tr"] as const;

export default rawGetRequestConfig(async () => {
  const cookieStore = await cookies();

  const localeCookie = cookieStore.get("locale")?.value;
  if (
    localeCookie &&
    SUPPORTED_LOCALES.includes(
      localeCookie as (typeof SUPPORTED_LOCALES)[number]
    )
  ) {
    const messages = (await import(`../../messages/${localeCookie}.json`))
      .default;
    return { locale: localeCookie, messages };
  }

  const header = cookieStore.get("accept-language")?.value ?? "";
  const headerLang = header.split(",")[0].split("-")[0];
  const locale = (await SUPPORTED_LOCALES.includes(
    headerLang as (typeof SUPPORTED_LOCALES)[number]
  ))
    ? headerLang
    : "en";

  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
});
