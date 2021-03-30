import React, {useState} from 'react';

export const AddNoteForm = React.createContext('hide');
export const EditNoteForm = React.createContext('hide');
export const EditNoteData = React.createContext({});

export const FilterSelect = React.createContext('Все');

export const FilterVisible = React.createContext('hide');

export const Actions = React.createContext('');

export const NotesVisible = React.createContext('');

export const ImportantOnly = React.createContext(false);

export const Token = React.createContext(false);

const NoteStore = ({children}) => {
    
    const [addNote, setAddNote] = useState('hide');
    const [editNote, setEditNote] = useState('hide');
    const [editNoteData, setEditNoteData] = useState({});
    const [filter, setFilter] = useState('hide');
    const [notesVisible, setNotesVisible] = useState('');
    const [actionVisible, setActionVisible] = useState('');
    const [filterSelect, setFilterSelect] = useState('Все');
    const [importantOnly, setImportantOnly] = useState(false);
    const [token, setToken] = useState(false);

    return(
        <AddNoteForm.Provider value={[addNote, setAddNote]}>
            <EditNoteForm.Provider value={[editNote, setEditNote]}>
                <FilterVisible.Provider value={[filter, setFilter]}>
                    <Actions.Provider value={[actionVisible, setActionVisible]}>
                        <ImportantOnly.Provider value={[importantOnly, setImportantOnly]}>
                            <Token.Provider value={[token, setToken]}>
                                <FilterSelect.Provider value={[filterSelect, setFilterSelect]}>
                                    <EditNoteData.Provider value={[editNoteData, setEditNoteData]}>
                                        <NotesVisible.Provider value={[notesVisible, setNotesVisible]}>
                                            {children}
                                        </NotesVisible.Provider>
                                    </EditNoteData.Provider>
                                </FilterSelect.Provider>
                            </Token.Provider>
                        </ImportantOnly.Provider>
                    </Actions.Provider>
                </FilterVisible.Provider>
            </EditNoteForm.Provider>
        </AddNoteForm.Provider>
    );
}

export default NoteStore;
