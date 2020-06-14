
import React, { useRef, useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import '../App.css'



const InstructionModal = (props) =>{

    const [open, setOpen] = React.useState(props.open);


    useEffect(() => {
        if(props.open)
        setOpen(props.open);

      }, [props.open]);

      

    const handleClose = e => {
        setOpen(false);
        props.setInstructionDialog(false)
        };


    
    return (
        <div>
        <Modal
          title="Manual / Instrukcja użytkowania"
          visible={open}
          onOk={handleClose}
          onCancel={handleClose}
          className = "modal"

        >
        <p>Just paste ugly aliexpress link and get beautiful one! 
            Just paste ugly links into upper text box and click fix it!
            You can choose between links in text format and clickable links by using switch. 
            Works for trashy links, links from all language versions of aliexpress and links from mobile app.</p>
        <p>BTW By using this website you agree to our use of cookies</p>
        <br></br>
        <p>Wklej w górnym polu linki do aliexpress z różnych wersji jezykowych,
            z różnymi śmieciami w linku lub w różnych formach (np z aplikacji),
            kliknij "fix it" i ciesz się pięknymi linkami których możesz używać
            z godnością i dzielić się nimi z przyjaciółmi.
            Możesz wybrać pomiędzy listą w formacie tekstowym a klikalnymi odnośnikami używając przełącznika.</p>
        <p>Przy okazji, Korzystając z tej strony akceptujesz to, że ta strona korzysta z cookies</p>
        
        </Modal>
        
        </div>
    );
};


export default InstructionModal;

