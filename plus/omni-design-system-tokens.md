# 🧿 Omni Design System — Извлечённые токены

> Источник: https://www.figma.com/design/921WDygeIIdnwlrExNKpaB/Omni-Design-System  
> Получено через Figma MCP

---

## Цвета (Colors)

### Основные / UI
| Токен | HEX | Описание |
|-------|-----|----------|
| `.Device · Global/Black` | `#000000` | Чёрный |
| `Spec · Background/White` | `#FFFFFF` | Белый фон |
| `UI · Front/Major` | `#131C26` | Основной текст |
| `fill_FH6AYQ` (тёмный текст) | `#1D2329` | Тёмный текст |
| `fill_FJSVS0` | `#3E4A59` | Серый текст |
| `fill_FWOOUU` | `rgba(184, 195, 209, 0.2)` | Полупрозрачный |

### Spec (спек-цвета)
| Токен | HEX |
|-------|-----|
| `Spec · Front/Line` | `#D1D9E0` |
| `Spec · Front/Faded` | `#B4BFCC` |
| `Spec · Front/Label B` | `#7F90A3` |

### Акценты / иконки
| Токен | HEX |
|-------|-----|
| `.Graphics/Icon` (brand) | `#FF0055` |
| `fill_CT778V` (ошибка/уведомление) | `#E81E40` |
| `fill_QXYECR` | `#7F8B99` |
| — | `#E5174B` |
| — | `#FF0040` |

### Дополнительные
| HEX | Примечание |
|-----|------------|
| `#D8E0EB` | Светло-серый |
| `#DFE5EB` | Фон |
| `#E9EFF5` | Фон |
| `#F2F5F7` | Фон светлый |
| `#F5F8FA` | Фон |
| `#B8C3D1` | Границы/декорации |
| `#31CC7E` | Успех/положительный |
| `#179958` | Зелёный |
| `#00A645` | Зелёный |
| `#2E7CF6` | Синий (ссылки) |
| `#5D21DE` / `#5D22E5` | Фиолетовый |
| `#546170` | Серый |
| `#3C4550` | Тёмно-серый |
| `#182430` | Тёмный |
| `#8698AD` | Серый текст |
| `#CECECE` | Светло-серый |
| `#292929` | Тёмный |
| `#11151A` | Почти чёрный |

### Тени
| Токен | CSS |
|-------|-----|
| `Soft · Wide` | `0px 3px 20px 0px rgba(0, 0, 0, 0.07)` |
| `Shadow/Soft · Bottom Light` | `0px 8px 16px 0px rgba(24, 36, 48, 0.08)` |

---

## Типографика (Typography)

### Шрифты
- **Inter** — основной латинский
- **Radial** — заголовки
- **SF Pro Text** — iOS/мобильные
- **IBM Plex Sans Arabic R** — арабский

### Стили (примеры)
| Стиль | font-family | font-weight | font-size | line-height |
|-------|-------------|-------------|-----------|-------------|
| Card/2 · Section Title | Radial | 150 | 32px | 1.0625em |
| Card/2 · Section Subtitle | Inter | 500 | 13px | 1.23em |
| Card/3 · Element Title | Inter | 700 | 16px | 1.25em |
| Card/3 · Element Subtitle | Inter | 500 | 13px | 1.23em |
| Latin/Caption/Caption | Inter | 500 | 12px | 1.33em |
| Latin/Caption/Bold | Inter | 700 | 12px | 1.33em |
| Arabic/Caption | IBM Plex Sans Arabic R | 500/700 | 12px | 1.83em |
| Default/Body/Bold | SF Pro Text | 600 | 17px | 1.29em |

---

## Компоненты (выборка)

### Кнопки
- `Controls / Buttons / IconButton · 48`
- `size=xs/sm/md/xl, variant=primary/secondary/ghost, tone=neutral`
- `FloatingButton`, `FloatingAction`

### Иконки
- `Icons / 24 x 24` — Navigation, Finance, Shopping, Miscellaneous, Feedback, Social, Controls
- `Icons / 16 x 16` — аналогичные категории

### Навигация
- `TabBarB2C · Latin/Arabic`
- `TabBarB2B · Latin/Arabic`
- `Building Blocks / Modules / App / Headers` (ContentTrail, Counter, NotificationDot)

### Типографика
- `Typography / Heading 2`
- `Typography / Accordion`
- `Typography / Train`
- `.Building Blocks / Typography / Heading`, `Subhead`, `AccordionSection`

### Карточки / секции
- `Title / 1 · Card Title`
- `Title / 2 · Section Title`
- `Title / 3 · Element Title`
- `.Section · Latin`

### Специфичные
- `PriceWidget`, `ProductSnippet`, `BadgeGroupSnippet`
- `FAQ · Latin`, `LegalsCheckbox`
- `FloatingButton`, `FloatingAction`
- `MerchantSpotL/S/XS` (плейсхолдеры мерчантов)

---

## CSS-переменные (пример)

```css
:root {
  /* Spec */
  --color-spec-line: #D1D9E0;
  --color-spec-faded: #B4BFCC;
  --color-spec-label: #7F90A3;
  --color-spec-white: #FFFFFF;
  
  /* UI */
  --color-ui-major: #131C26;
  --color-ui-black: #000000;
  
  /* Brand / Graphics */
  --color-graphics-icon: #FF0055;
  
  /* Semantic */
  --color-success: #31CC7E;
  --color-error: #E81E40;
  --color-link: #2E7CF6;
  
  /* Backgrounds */
  --color-bg-white: #FFFFFF;
  --color-bg-subtle: #F2F5F7;
  --color-bg-muted: #E9EFF5;
  
  /* Shadows */
  --shadow-soft: 0px 3px 20px 0px rgba(0, 0, 0, 0.07);
  --shadow-bottom: 0px 8px 16px 0px rgba(24, 36, 48, 0.08);
  
  /* Typography */
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-heading: 'Radial', serif;
  --font-arabic: 'IBM Plex Sans Arabic', sans-serif;
  
  --text-section-title: 32px;
  --text-element-title: 16px;
  --text-body: 13px;
  --text-caption: 12px;
}
```

---

*Данные извлечены автоматически. Рекомендуется свериться с Figma для актуальности.*
