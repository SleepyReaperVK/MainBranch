import  React, {useState , useEffect} from 'react';
import { View, SafeAreaView, StyleSheet ,StatusBar, Platform,Text , Image} from 'react-native';

// Mission :
// have individual checkMarks and each can link to different component to pass a value upon submit.
// example: a list of contacts to check mark which to add.
// select the right answer from the 5 option
// checkmark in the settings .
// all CheckMarks with isChecked : true will pass the value to the next screen.

//TODO reduser , remove from the array if check box is false / deselacted 
// [X]

const CheckMarkScreen = ({onSubmit}) => { 

  const [selectedValues, setSelectedValues] = useState([]);

    function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
  }

 


  const handleSubmit = () => {
    onSubmit(selectedValues)
  }

  useEffect(() => {
    console.log('selectedValues', selectedValues)
  }, [selectedValues]);

    return (
    <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
                
        </View>
    </SafeAreaView>
    );

};

export default CheckMarkScreen;


const styles = StyleSheet.create({
    safeView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
    container: {
        flex: 1,
        
    },
    card: {
    backgroundColor: 'rgba(211, 211, 211, 0.6)',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
})

