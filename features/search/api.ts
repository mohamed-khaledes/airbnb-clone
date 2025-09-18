export const getSearchResult = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/b/5NPS`);
    const searchResultDate = await res.json();
    return searchResultDate;
  } catch (error) {
    console.log(error);
  }
};