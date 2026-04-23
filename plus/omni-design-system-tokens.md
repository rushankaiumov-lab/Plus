# Omni Design System Tokens (updated from `ds-context.zip`)

> Обновлено по пакету `ds-context` (Product Tokens + Typography + Layout + Registry docs).  
> Базовые источники:
> - `design-system/colours.md`
> - `design-system/typography.md`
> - `design-system/layout.md`
> - `design-system/component-registry.md`

---

## Важно про безопасность текущих макетов

Обновление этого `.md` файла **не ломает** текущие экраны в `plus/index.html`, потому что:

- файл используется как документация и не подключается рантаймом;
- кастомные CSS-переменные в `index.html` остаются без изменений;
- переключение токенов начнет влиять на UI только когда мы вручную начнем заменять значения в стилях.

---

## 1) Цветовая архитектура (3-tier)

Система строится из 3 уровней:

1. **Colour Primitives** — сырые палитры
2. **Product Tokens** — семантические токены (основной слой для UI)
3. **Brand Colours** — брендовые стили для графики/иллюстраций

Ключевой принцип: в UI использовать **семантические токены**, а не raw HEX.

### Режимы темы (Product Tokens)

- `Light`
- `Dark`
- `Light New brand`
- `Dark New brand`

### Ключевые токены (resolved values)

| Token | Light | Dark | Light New brand | Dark New brand |
|---|---|---|---|---|
| `Background/General L0` | `#f2f4f7` | `#000000` | `#f4f3f2` | `#000000` |
| `Background/General L1` | `#ffffff` | `#1c2228` | `#ffffff` | `#191919` |
| `Background/Control Primary` | `#1c2228` | `#ffffff` | `#191919` | `#ffffff` |
| `Background/Accent Strong` | `#5c21dd` | `#a979f2` | `#66abfe` | `#397dce` |
| `Front/Primary` | `#1c2228` | `#f2f4f7` | `#191919` | `#f4f3f2` |
| `Front/Secondary` | `#7e8b99` | `#b8c3d1` | `#75726f` | `#8e8b87` |
| `Front/Link` | `#5c21dd` | `#ccb1f9` | `#397dce` | `#8cc4f7` |
| `Front/Positive` | `#169957` | `#76eda6` | `#419353` | `#90d19e` |
| `Front/Negative` | `#e81e3f` | `#ffa9a8` | `#d34c3b` | `#fc9b8d` |
| `Line/Primary L1` | `#b8c3d1` | `#3d4959` | `#bab6b2` | `#3d3b39` |
| `Line/Primary L2` | `#d7e0ea` | `#546070` | `#d6d2cf` | `#595653` |

---

## 2) Level system (L0-L3)

Для вложенности используется отдельная коллекция уровней:

- **L0**: фон страницы
- **L1**: первый уровень контента (карты, блоки)
- **L2**: sheets/modals
- **L3**: вложенные элементы внутри elevated-блоков

Это нужно, чтобы сохранять контраст при вложении и избежать "серый на сером".

---

## 3) Typography (актуальная модель)

Типографика живет в коллекции `🕹️ Device` с 4 режимами:

- Mobile
- Desktop
- Mobile New brand
- Desktop New brand

### Шрифтовой стек

| Role | Current brand | New brand |
|---|---|---|
| Latin Display | Radial Saudi | Tabby Sans Display |
| Latin Text | Inter | Tabby Sans Text |
| Arabic Display | IBM Plex Sans Arabic R | Tabby Sans Display |
| Arabic Text | IBM Plex Sans Arabic R | Tabby Sans Text |

### Ключевые отличия New brand

- Заголовки становятся более компактными: `H1 35 -> 30`, `H2 30 -> 24`, `H3 22 -> 19`
- Body по умолчанию: `Medium -> Regular`
- Letter spacing: от отрицательных значений к около-нулевым/положительным

---

## 4) Layout rules (для экранов 414x896)

- Фрейм: `414 x 896`
- Фон страницы: `Background/General/Level 0`
- Цвета: только через semantic tokens
- Текст: только через DS text styles (не руками font-size/weight)
- Структура: `NavBar -> Content -> Toolbar XXL` или `TabBar`

Default modes (если нет спец-условий):

- `Device`: `Mobile New brand`
- `Theme`: `Light new brand`
- `Language`: `Latin`

---

## 5) Влияние на текущий `plus/index.html` и кастомные решения

Сейчас в прототипе уже есть "полу-совместимость" с New brand:

- используются `Tabby Sans Display` и `Tabby Sans Text`
- базовые нейтрали типа `#1A1919`, `#F5F4F2`, `#75726F` совпадают с New brand направлением

Но есть и кастомные значения, которые отличаются от strict DS.

### Быстрый маппинг ваших переменных к DS семантике

| Текущее в `index.html` | Пример значения | DS-направление |
|---|---|---|
| `--text-primary` | `#1a1919` | `Front/Primary` (Light New brand) |
| `--text-secondary` | `#75726f` | `Front/Secondary` (Light New brand) |
| `--btn-xl-fill` | `#1a1919` | `Background/Control Primary` |
| `--color-page-gray` | `#F5F4F2` | `Background/General L0` |
| `--color-bg-muted` | `#EBE7E4` | близко к `Background/General L2` / neutral-100 |
| `--color-pill-border` | `#6CFF93` | спец brand/positive, требует отдельного решения |

---

## 6) Как внедрять без поломок

1. **Не трогать компоненты сразу** — сначала завести слой алиасов:
   - `--ds-front-primary`, `--ds-bg-control-primary`, etc.
2. Перевести 1-2 секции (например, `method-added`, кнопки) и проверить визуально.
3. Затем проходить по экранам поэтапно (activation -> cancellation), фиксируя diff.
4. Оставить кастомные "исключения" (если нужны для UX/прототипа), но явно пометить их как override.

---

## 7) Что дальше

Если нужно, следующим шагом можно сделать файл-слой:

- `plus/assets/debug/ds-alias-tokens.css`

и подключить его в `index.html`, чтобы у нас был controlled migration к DS без резких поломок.
