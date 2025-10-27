package me.shinsunyoung.springbootdeveloper;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SpringBootApplication
public interface MemberRepository extends JpaRepository<Member, Long> {
    public static void main(String[] args) {
        SpringBootDeveloperApplication.run(SpringBootDeveloperApplication.class, args);
    }
}
