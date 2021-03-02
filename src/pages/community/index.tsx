//@ts-nocheck
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getCommunity } from "../../api";
import Container from "../../components/common/Container";
import Cover from "../../components/common/Cover";
import ProfilePicture from "../../components/common/ProfilePicture";
import CommunityInfo from "../../components/community/CommunityInfo";
import CommunityPicture from "../../components/community/CommunityPicture";
import Join from "../../components/community/Join";
import NewPostTeaser from "../../components/post-form/NewPostTeaser";
import PostTeaser from "../../components/posts/PostTeaser";
import { CommunityType } from "../../types";

export default function CommunityPage({ match }: { match: any }) {
  const [community, setCommunity] = useState<CommunityType | undefined>();
  const [coverImage, setCoverImage] = useState<string>("");
  const [communityImage, setCommunityImage] = useState<string | undefined>();
  const name: string = match.params.name;

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    const response = await getCommunity(name);
    if (response.statusText === "OK") {
      setCommunity(response.data);
      setCoverImage(
        response.data.coverImage
          ? `http://${response.data.coverImage}`
          : "http://localhost:4000/static/default-cover.png"
      );
      response.data.image
        ? setCommunityImage(response.data.image && `${response.data.image}`)
        : setCommunityImage();
      console.log(response.data);
    }
  };

  return (
    <>
      ,
      {community && (
        <Box>
          <Cover coverImage={coverImage} />
          <Container mt={260}>
            <Flex position="relative" top="-80px" gridGap={5}>
              <Box>
                <CommunityPicture
                  imageSrc={communityImage}
                  communityName={community.name}
                />
              </Box>
              <Flex gridGap={5} alignItems="center">
                <Text fontSize={32} fontWeight="bold">
                  {community.name}
                </Text>
                <Join community={community} />
              </Flex>
            </Flex>
            <Flex gridGap={5}>
              <Box>
                <NewPostTeaser />
                {community.posts.map((post) => (
                  <PostTeaser post={post} />
                ))}
              </Box>
              <CommunityInfo community={community} />
            </Flex>
          </Container>
        </Box>
      )}
    </>
  );
}
