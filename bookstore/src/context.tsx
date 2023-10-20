import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

type AppContextType = {
  loading: boolean;
  books: BookData[];
  setSearchTerm: (term: string) => void;
  resultTitle: string;
  setResultTitle: (title: string) => void;
};

const URL = "http://openlibrary.org/search.json?title=";
const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface BookData {
  cover_id: any;
  id: any;
  key: string;
  author_name: string[];
  cover_i: number;
  edition_count: number;
  first_publish_year: number;
  title: string;
}

const AppProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            const {docs} = data;

            if(docs){
              const newBooks = docs.slice(0, 20).map((bookSingle: BookData) => {
                    const {key, author_name, cover_i, edition_count, first_publish_year, title} = bookSingle;

                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title
                    }
                });

                setBooks(newBooks);

                if(newBooks.length > 1){
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

  return (
        <AppContext.Provider value = {{
            loading, books, setSearchTerm, resultTitle, setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
      throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
}

export { AppContext, AppProvider };

