# SITE_BRIEF: data inventory of a news website (with sports)

Fill the SITE block, keep the rest. Used to build mock data now and to map the real API later.

## SITE (fill per site)
- SITE_DOMAIN:mentecomcuidado.com
- SITE NAME:
- SUB-NICHE / topic:Saúde mental, Informação, Saúde mental: notícias e guias | Mente com Cuidado
- LANGUAGE:In the whole website use translation system not a fix language
- SECTIONS :https://gamescomcriterio.com/ , for section and pages visit this website , you have to create home, details, sports , and other relevant pages and section witch align with niche.  
- SPORTS PAGE: yes.

Reference notes: observed on espn.in (UOL could not be opened, so UOL points below come from general knowledge of big news portals and must be treated as assumptions).

## 1. Global (every page)
- Site name, logo, language, nav = sections of this domain; "more" menu with the remaining sections (mega-menu); search; theme toggle; language switcher (only if more than one locale).
- Footer: about, contact, privacy, terms, corrections/editorial policy, social links, copyright, short disclaimers (e.g. betting or sponsored-content notice when relevant).
- Ad/partner slots: header, sidebar, content, footer, popup (may be empty).

## 2. Home
- Top headlines: list of 8-10 text-only headlines (title + url).
- Lead story: image + photo credit, kicker/label, headline, deck (summary), author, relative time ("7h", "2d"), plus 2-3 related sub-links under it.
- Hero banner: 20 featured articles (HomePage, newest first) for the animated hero.
- Topic rails: one per section: label, 1 featured article with image, 3-5 headline links, "see all".
- Latest news grid, "most read" ranking (rank, title, views optional), daily updates/live-blog item (title, time, summary).
- Featured topics/competitions list (name, icon/crest, url); quick links.
- Scoreboard widget (sports sites): today's matches by league with score/status/time, "see all".
- Newsletter block; hero/partner banners; social links.

## 3. Section page
- Section name + description, breadcrumbs, featured article, article list with image/kicker/headline/deck/author/date, pagination or load-more (limit, page), sort, filters (date range, tag), empty state.

## 4. Article page
- Kicker/section, headline, deck, author (name, optional avatar/bio), published + updated date, reading time, hero image + caption + photo credit + alt, body (markdown with links, lists, images, embeds optional), tags, share, related articles, previous/next, breadcrumbs, JSON-LD NewsArticle. Optional: reactions/comments (sentiment API).

## 5. Search
- Query, debounced suggestions (articles with thumbnail + title + section + date; sections; teams/players on sports sites), recent searches, results page with filters and pagination, empty state.

## 6. Newsletter and banners
- Subscribe (email), states: success 201, resubscribed 200, already subscribed 400, invalid 400, unknown site 404. Unsubscribe page reading ?email=. Editorial hero banner (none = hide), partner banners by position.

## 7. Sports (when SPORTS PAGE = yes)
- Leagues list and selected league (name, logo, country, season), scoreboard by date, fixtures next/last, results, live matches (minute, score), standings (rank, team + crest, played, W/D/L, goal diff, points, form), top scorers/assists/cards (player, team, number), teams (name, crest, venue), team page (squad, fixtures, stats), players (name, photo, position, stats), match detail (status, score, venue, events timeline, lineups, team stats), transfers, injuries.
- Missing logo/photo means generated initials badge, never a broken image.

## 8. Normalized types to support (add only what is missing in lib/types.ts)
- Article: id, slug, title, summary, bodyMarkdown, section, kicker?, author?, publishedAt, updatedAt?, image?{url, alt, credit?, caption?}, tags[], readingMinutes?
- Banner (hero/partner), Section, SearchResult, Subscription result.
- League, Team, Player, Match, Standing, TopStat, MatchEvent, Lineup.
- Everything optional that the real API may not provide.

## 9. Mock plan
- 20 featured articles + at least 6 per section, dates over the last 14 days, 4-6 authors, markdown bodies with links/list/image.
- Edge cases: 3 articles without image, 1 very long title, 1 very short title, 1 without author, 1 section with only 1 article, 1 section empty.
- Sports: 20 teams, 3 leagues, 1 live match, matches with and without crest, empty top-cards list.
- Mock service must behave like the API: section, limit, page, sort, search, 200-400ms delay, selected only by NEXT_PUBLIC_USE_MOCK.
