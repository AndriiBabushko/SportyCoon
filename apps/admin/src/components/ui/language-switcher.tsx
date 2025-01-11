import type { JSX } from "react";
import React, { useTransition } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import { Icons, Paragraph } from "@sportycoon/ui";
import { useParams } from "next/navigation";
import type { Locale } from "@sportycoon/locales";
import {
  useLocale,
  usePathname,
  useRouter,
} from "@sportycoon/locales";

interface LanguageMenuItem {
  code: Locale;
  name: string;
  flag: string;
}

const languages: LanguageMenuItem[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ua", name: "Українська", flag: "🇺🇦" },
];

export default function LanguageSwitcher(): JSX.Element {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: Locale): void => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  return (
    <Menu>
      <MenuButton>
        <Flex align="center" gap="2">
          <Paragraph className="text-[24px]" variant="montserrat">
            {languages.find((lang) => lang.code === locale)?.flag}
          </Paragraph>
        </Flex>
      </MenuButton>

      <MenuList>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => {
              handleLanguageChange(language.code);
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Flex gap="8px">
                <Paragraph className="text-[18px]" variant="montserrat">
                  {language.flag}
                </Paragraph>
                <Paragraph className="text-[18px]" variant="montserrat">
                  {language.name}
                </Paragraph>
              </Flex>
              {locale === language.code ? (
                <Icons.Check className="w-[18px] h-[18px]" />
              ) : null}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
