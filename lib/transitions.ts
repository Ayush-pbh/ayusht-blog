/**
 * The view-transition name a title carries both in a list and as the headline
 * of its own page. Two elements with the same name on either side of a
 * navigation become one element in transit, so the title you clicked travels
 * into the article instead of crossfading with the rest of the page.
 *
 * Keyed by href rather than slug, so a post and a project can never collide.
 */
export function titleTransitionName(href: string): string {
  return `title${href.replace(/[^a-z0-9]+/gi, "-")}`;
}
