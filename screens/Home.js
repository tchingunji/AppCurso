import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native-web';


const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        borderbottom: '5px solid red',
    },
    logo: {
        width: '100px',
        height: 30,
    },
    btnmenu: {
        width: 30,
        height: 30,
    },
    previa: {
        width: '100px',
        height: 30,
    },
    card_template: {

        boxShadow: "0px 0.5px rgba(0,0,0,0.2)",
        borderRadius: '60px',
    },


});



export default function Home() {

    const [categoria, setCategoria] = useState([])
    const [curso, setCurso] = useState([])
    const [img, setImg] = useState([])

    const getCategoria = async () => {
        try {
            const response = await fetch('https://blog.coursify.me/wp-json/wp/v2/categories/');
            const json = await response.json();
            setCategoria(json);
            // console.log(json);
        } catch (error) {
            console.error(error);
        }
    }
    const getCursos = async () => {
        try {
            const response = await fetch('https://blog.coursify.me/wp-json/wp/v2/posts');
            const json = await response.json();
            setCurso(json);
            console.log(json)
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getCategoria();
        getCursos();

    }, []);



    const Media = (props) => {

    }


    const Post = (props) => {

        var data = [];
        for (var i = 0; i < curso.length; i++) {
            if (curso[i].categories.includes(props.codigo)) {
                data.push(curso[i]);
            }
        }

        return (
            <View
                style={{
                    marginTop: 5,
                    backgroundColor: "#fff",
                    paddingVertical: 10,
                    paddingLeft: 20,
                }}
            >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data.map((itens, index) => (
                        <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
                            <Image style={styles.card_image} source={require('../assets/icon.png')} />
                            <Text numberOfLines={1} style={{ fontSize: '17px', fontWeight: "500", color: "#2AB598", width: 250 }}>{itens.title.rendered}</Text>

                            <Text numberOfLines={1} style={{ width: 200 }}>{itens.excerpt.rendered}</Text>
                            <Text style={{ fontSize: '16px', color: '#FDA506' }}>Leia mais</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }

    const Banner = () => {
        return (
            <View style={{ backgroundColor: "#FFF", padding: '10px' }}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={categoria}
                    renderItem={({ item }) => (
                        <View style={styles.card_template}>
                            <Text style={{ color: "#2AB598", fontSize: '18px', fontWeight: 'bold' }}>{item.name}</Text>
                            <Post codigo={item.id} />
                        </View>
                    )}
                />
            </View>
        );
    }


    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.menu}>

                <View>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}
                    />
                </View>
                <View style={{ marginLeft: '60%' }}>
                    <Image
                        style={styles.btnmenu}
                        source={require('../assets/menu.png')}
                    />
                </View>
            </View>
            <ScrollView>
                <View style={{ padding: '7px' }}>
                    <Banner />
                </View>
            </ScrollView>

            <View style={{ backgroundColor: "#1ABC9C", padding: '37px' }}>
                <View style={{ borderRadius: 100 / 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/logo.png')}
                    />
                    <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: "#fff", fontSize: '12px', textAlign: 'center', marginBottom: '10px' }}>
                            O Coursify.me é uma plataforma de ensino a distância,
                            onde qualquer pessoa ou empresa pode construir seu
                            EAD e vender cursos pela internet.
                        </Text>
                        <TouchableOpacity style={{ backgroundColor: "#FFA900", borderRadius: '60px', padding: '10px', alignSelf: 'center' }}>
                            <Text style={{ color: "#fff" }}>Quero conhecer a plataforma</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}