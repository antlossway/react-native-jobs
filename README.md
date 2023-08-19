# react-native Jobsearch App 

## installation

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

```
 npx create-expo-app@latest -e with-router
 npm install expo-font axios react-native-dotenv
```

## what I learned

### expo routing

Similar to next.js file-based routing, every file in "app" directory becomes a route in application.
- app/home.js matches /home
- app/settings/index.js matches /settings: files named **index.[js,jsx,ts,tsx]** match the parent directory and don't add a path segment.
- app/blog/[slug].js matches dynamic paths like /blog/post1 /blog/post2
- multiple slugs can be matched in a single route by using the rest syntax(...)
  e.g app/blog/[...id].js matches /blog/123/settings

dynamic segments are accessible as **search parameters** in the page component
```js
import { useLocalSearchParams } from 'expo-router';

import { Text } from 'react-native';

export default function Page() {
  const { slug } = useLocalSearchParams();

  return <Text>Blog post: {slug}</Text>;
}

```
The difference between **useLocalSearchParams** and **useGlobalSearchParams**: useGlobalSearchParams will cause more re-renders in the background, should be used carefully.


> In Expo Router, you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
> Try to reduce the scope of your providers to only the routes that need them. This will improve performance and cause fewer rerenders.

```js
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
```

**Stack navigation**: render a stack of screens like a deck of cards with a **header** on top.
use **ScreenOptions** prop to configure the header bar
```
```

### useCallback and useFonts in app/_layout.js 

#### useCallback
**useCallback** is usually used to wrap a function that is going to be passed as a prop to a component
```
const handleReset = useCallback(() => {
  return doSomething(a, b)
}, [a, b])
```
> **useMemo** will call the function passed to it whenever its dependencies change and will return the value of that function call. 
> **useCallback** on the other hand will not call the function passed to it and instead will return a new version of the function passed to it whenever the dependencies change.
> This means that as long as the dependencies do not change then **useCallback** will return the same function as before which maintains referential equality.

#### useFonts
```js
//app/_layout.js

import {useFonts} from "expo-font"

//fontsLoaded: true || false
const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
})
```

### expo Image

local image need to use `require('relative path')`

```js
//example using remote image, uri:image_link
        <Image
          source={{
             uri: checkImageURL(item.employer_logo)
               ? item.employer_logo
               : "https://xxxxx",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
```

```js
//example using local image, require(relative_path)
        <Image
          source={
            checkImageURL(item.employer_logo)
              ? { uri: item.employer_logo }
              : require("../../../../assets/favicon.png")
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
```

### nullish coelescing operator ?? vs. Ternary operator
?? is used to check if a value is present, if yes then return that value (even when evaluation on that value is false,e.g 0,''),
if the value does not exist, then return a fallback value

```js
// app/job-details/[id].js
return <Spicifics title='Qualifications'
            points={data[0].job_highlights?.qualifications ?? ['N/A']} />
```

ternary operator ? will check if a value is present and evaluated to be true, if yes then return first expression, otherwise return second expression

### TextInput onChangeText
in react, we use onChange={(e) => setSearchTerm(e.target.value)}
in react-native, we use onChangeText={(text) => setSearchTerm(text)}, the text value is directly provided 

```js
// components/home/welcome/Welcome.jsx
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            //in react-native, no need to use e.target.value
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for"
          />
```

### refreshControl
**refreshControl** is used inside a ScrollView or ListView to add pull to refresh functionality, swiping down triggers an `onRefresh` event,
on the screen will have loading icon running indicating fetching data.

```js
  //note here we use useCallback to wrap the function that is going to be passed as a prop to component **refreshControl**
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
....
	
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
```

### render a list with "map" or "FlatList"?
If just a few items, then use **map** is simpler solution. But in order to be able to scroll,need to put **map" in a <View> and in a <ScrollView>.
If bigger list, better use **FlatList**, because it comes with many features like ScrollView, pull to refresh, separator, header(ListHeaderComponent), footer(ListFooterComponent).
FlatList will only load data that need to be displayed on screen.

Core items:
 - data: takes an array of data to be rendered
 - renderItem: define a function that takes data via parameters and return a formatted component to be displayed on screen
 - keyExtractor

```js
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={persons}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
```

### deploy to EAS
1. install latest EAS CLI
```bash
npm install -g eas-cli
```

2. login to expo account
```bash
eas login
#check if logged in
eas whoami
```

3. configure project
```bash
eas build:configure
```
4. run a build
if deploy on iOS, require Apple developer account, somehow there is problem that I can not enroll
make a simulator build for iOS requires Mac, but I'm running Linux, so the only choice right now is 
to make a installable apk for andriod device.

[https://docs.expo.dev/build/setup/](https://docs.expo.dev/build/setup/)

eas.json
```
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },

eas build -p android --profile preview2
```
